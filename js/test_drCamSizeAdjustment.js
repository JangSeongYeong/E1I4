const crashBtn = document.querySelector("#crashBtn"); //다른 신호 들어왔을때
const HIDDEN_CLASSNAME = "hidden"; // 감추는 class
let sData = "0";

function setWebcamSize(cam, size) { // 화면 확대
    cam.style.width = size;
}

function resetWebcam() { // 초기 화면으로
    setWebcamSize(cam1, "50%");
    setWebcamSize(cam2, "50%");
    cam1.classList.remove(HIDDEN_CLASSNAME);
    cam2.classList.remove(HIDDEN_CLASSNAME);
}

crashBtn.addEventListener("click", () => {
    resetWebcam()
    closeModal()
});

const ws8766 = new WebSocket(`ws://${ipAddress}:8766`);

ws8766.onopen = function () {
    console.log("WebSocket is connected 8766.");
    resetWebcam();
};

ws8766.onmessage = (event) => {
    const Data = event.data
    if (Data === "1") { 
        if (sData !== Data && sData !== "0"){
            crashBtn.classList.remove(HIDDEN_CLASSNAME);
        } else {   
            sData = Data;
            setWebcamSize(cam1, "100%");
            cam2.classList.add(HIDDEN_CLASSNAME);
            cam1.classList.remove(HIDDEN_CLASSNAME);
            openModal(Data);
            console.log("cam1"); //이 줄 기준 위에 5줄 함수화 시키기
        }
    } else if (Data === "2") {
        if (sData !== Data && sData !== "0"){
            crashBtn.classList.remove(HIDDEN_CLASSNAME);
        } else {
            sData = Data;
            setWebcamSize(cam2, "100%");
            cam1.classList.add(HIDDEN_CLASSNAME);
            cam2.classList.remove(HIDDEN_CLASSNAME);
            openModal(Data);
            console.log("cam2");
        }
    }
};

ws8766.onerror = function (error) {
    console.error("WebSocket Error: ", error);
};