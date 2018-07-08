import speech from './speech.js'

const player = new speech('第一段对话今天天气好好,第二段对话一二三四五九十,第三段对话今天天气很不好,第四段对话一二三四五六七八九十,第五段对话今天天气不要这么好');

window.t = player;


document.getElementById('start').onclick=()=>{
    t.play()
}
document.getElementById('stop').onclick = () => {
    t.pause()
}
// player.play()
