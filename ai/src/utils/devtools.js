class DevToolsChecker extends Error {
    toString() {}

    get message() {
        onDevToolsOpen()
    }
}

function onDevToolsOpen() {
    setTimeout(console.clear.bind(console))
    setTimeout(() => {
        console.log(
            "%cTrò chơi không thích hợp khi mở devtools. 🙂",
            "text-shadow: 0 0 10px #fff;color: red; font-size: 30px;  font-weight: bold;"
        )
        
        console.log(
            "%cHaiZuka",
            "text-shadow: 0 0 10px #fff;color: red; font-size: 50px; background-color: #000; padding: 10px; border-radius: 10px; font-weight: bold;"
        )
        
    }, 10);
    setTimeout(() => {
        window.location.reload()
    }, 10);
}

// console.log(new DevToolsChecker())