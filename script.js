document.getElementById('throw-btn').addEventListener('click', throwCups);

function throwCups() {
    const cupA = document.getElementById('cupA');
    const cupB = document.getElementById('cupB');
    const resultText = document.getElementById('result-text');
    const button = document.getElementById('throw-btn');

    // 1. 鎖定按鈕，顯示祈禱文字
    button.disabled = true;
    resultText.innerHTML = "🔮 筊杯翻滾中，神明查閱專案中...";

    // 2. 觸發網頁動畫效果
    cupA.classList.add('tossing');
    cupB.classList.add('tossing');

    // 3. 設定隨機結果 (0 代表平面朝上/反，1 代表凸面朝上/正)
    const stateA = Math.floor(Math.random() * 2);
    const state2 = Math.floor(Math.random() * 2);

    // 4. 動態調整 3D 模型的相機視角 (配合你的 GLB 軸向)
    // 💡 注意：這裡使用 camera-orbit 來轉動視角，0deg 0deg 0m 代表看正面，180deg 0deg 0m 代表看反面
    // 如果你的模型導出時角度不同，可以調整這組角度（例如改用 0deg 180deg 0m 等）
    setTimeout(() => {
        if (stateA === 1) {
            cupA.setAttribute('camera-orbit', '0deg 0deg 0m'); // 正面朝上
        } else {
            cupA.setAttribute('camera-orbit', '180deg 0deg 0m'); // 反面朝上
        }

        if (state2 === 1) {
            cupB.setAttribute('camera-orbit', '0deg 0deg 0m');
        } else {
            cupB.setAttribute('camera-orbit', '180deg 0deg 0m');
        }
    }, 200); // 在動畫升到最高點時悄悄切換角度

    // 5. 動態結束，顯示神明指示
    setTimeout(() => {
        cupA.classList.remove('tossing');
        cupB.classList.remove('tossing');

        // 判斷擲筊聖番結果
        if (stateA !== state2) {
            resultText.innerHTML = "<span style='color: #2e7d32; font-weight: bold; font-size: 1.5rem;'>【 聖筊 】</span><br>神明大表贊同！心想事成！";
        } else if (stateA === 1 && state2 === 1) {
            resultText.innerHTML = "<span style='color: #c62828; font-weight: bold; font-size: 1.5rem;'>【 陰筊 】</span><br>神明搖頭說不好，建議重新思考。";
        } else {
            resultText.innerHTML = "<span style='color: #ef6c00; font-weight: bold; font-size: 1.5rem;'>【 笑筊 】</span><br>神明笑而不答，可能你沒說清楚，再問一次吧。";
        }

        button.disabled = false;
    }, 800); // 這裡要跟 CSS 的動畫時間（0.8s）同步
}