import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const dinoEl = document.querySelector('[data-dino')
const JUMP_SPEED = .45;
const GRAVITY = .0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
export function setupDino(){
	isJumping = false
	dinoFrame = 0
	currentFrameTime = 0
}

export function updateDino(delta, speedScale){
	handleRun(delta, speedScale)
	handleJump(delta)

}

function handleRun(delta, speedScale){
	if(isJumping){
		dinoEl.src = `./assets/dino-stationary.png`
		return
	}

	if(currentFrameTime >= FRAME_TIME){
		dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
		dinoEl.src = `./assets/dino-run-${dinoFrame}.png`
		currentFrameTime -= FRAME_TIME
		
	}
	currentFrameTime += delta * speedScale
}

function handleJump(delta){
	if(!isJumping) return

	incrementCustomProperty(dinoEl, "--bottom", yVelocity * delta)
	
	if(getCustomProperty(dinoEl, "--bottom") <= 0){
		setCustomProperty(dinoEl, "--bottom", -)
		isJumping = false
	}

	yVelocity -= GRAVITY * delta

}

