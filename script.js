import {updateGround, setupGround } from './ground.js'
import {updateDino, setupDino, getDinoRect, setDinoLose} from './dino.js'
import {updateCactus, setupCactus , getCactusRects} from './cactus.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = .00001

const world = document.querySelector('[data-world]')
const dinoScore = document.querySelector('[data-score]')
const startScreen = document.querySelector('[data-start-screen]')

setPixelToWorldScale();
window.addEventListener('resize', setPixelToWorldScale);
document.addEventListener('keydown',handleStart,{once:true})


let lastTime;
let speedScale;
let score;

function update(time){
if(lastTime == null){
	lastTime = time
	window.requestAnimationFrame(update)
	return
}
	const delta = time - lastTime;

	updateGround(delta, speedScale)
	updateDino(delta, speedScale)
	updateCactus(delta, speedScale)
	updateSpeedScale(delta)
	updateScore(delta)
	if(checkLose()) return handleLose()

	lastTime = time
	window.requestAnimationFrame(update)
}

function checkLose(){
	const dinoRect = getDinoRect()
	return getCactusRects().some(rect => isCollision(rect , dinoRect))
}

function isCollision(rect1,rect2){
	return (
	rect1.left < rect2.right && 
	rect1.top < rect2.bottom && 
	rect1.right > rect2.left && 
	rect1.bottom > rect2.top
	)
}

function updateSpeedScale(delta){
	speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta){
	score += delta * .01
	dinoScore.textContent = Math.floor(score)
}

function handleStart(){
	lastTime = null;
	speedScale = 1;
	score = 0;
	setupGround();
	setupDino()
	setupCactus()
	startScreen.classList.add('hide')
	window.requestAnimationFrame(update);
}

function handleLose(){
	setDinoLose()
	setTimeout(() => {
	document.addEventListener('keydown', handleStart, {once:true})
	startScreen.classList.remove('hide')
	}, 100)
}

function setPixelToWorldScale(){
	let worldToPixelScale;
	if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
	{
		worldToPixelScale = window.innerWidth / WORLD_WIDTH
	}else {
		worldToPixelScale = window.innerHeight / WORLD_HEIGHT
	}


world.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
world.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}