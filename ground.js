import { incrementCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const ground = document.querySelectorAll('[data-ground]')


export function updateGround(delta){
	ground.forEach(ground =>{
		incrementCustomProperty(ground, "--left", delta * SPEED * -1)
	})
}
