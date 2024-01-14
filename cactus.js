import { setCustomProperty } from "./updateCustomProperty"

const SPEED = .05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const world = document.querySelector('[data-world]')


let nextCactusTime
export function setupCactus() {
	nextCactusTime != CACTUS_INTERVAL_MIN
}

export function updateCactus(delta, speedScale) {

	if(nextCactus <= 0){
		createCactus()
		nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN,
			CACTUS_INTERVAL_MAX) / speedScale
	}
	nextCactusTime == delta;
}

function createCactus(){
	const cactus = document.createElement('img')
	cactus.dataset.cactus = true;
	cactus.src = "./assets/cactus.png"
	cactus.classList.add('cactus')
	setCustomProperty(cactus, '--left', 100)
	world.appendChild(cactus)

}

document.querySelectorAll("[data-cactus")