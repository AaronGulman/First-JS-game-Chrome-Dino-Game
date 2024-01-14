import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const SPEED = .05
const ground = document.querySelectorAll('[data-ground]')

export function setupGround(){
	setCustomProperty(ground[0], "--left",0)
	setCustomProperty(ground[1], "--left",300)

}

export function updateGround(delta){
	ground.forEach(ground =>{
		incrementCustomProperty(ground, "--left", delta * SPEED * -1)

		if(getCustomProperty(ground, '--left') <= -300){
			incrementCustomProperty(ground, "--left",600)
		}
	})
}
