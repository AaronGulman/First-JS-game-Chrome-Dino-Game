import {updateGround, setupGround } from './ground.js'

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
	updateSpeedScale(delta)
	updateScore(delta)

	lastTime = time
	window.requestAnimationFrame(update)
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
	startScreen.classList.add('hide')
	window.requestAnimationFrame(update);
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