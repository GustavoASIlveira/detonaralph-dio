const state = {
	view: {
		squares: document.querySelectorAll('.square'),
		enemy: document.querySelector('.enemy'),
		time: document.querySelector('.time'),
		score: document.querySelector('.score'),
		lives: document.querySelector('.lives')
	},
	values: {
		gameOver: false,
		hitPosition: 0,
		result: 0,
		currentTime: 60,
		isKillerDown: true,
		playerLives: 3,
		hitSound: new Audio('./assets/audio/hit.m4a'),
		missSound: new Audio('./assets/audio/miss.ogg')
	},
	actions: {
		timerId: setTimeout(getRandomSquare, Math.floor(Math.random() * 501) + 500),
		countDownId: setInterval(countDown, 1000)	
	}
}

function countDown(){
	state.values.currentTime--
	state.view.time.textContent = state.values.currentTime
	
	if(state.values.currentTime <= 0){
		gameOver()
	}
}

function gameOver(){
	state.values.gameOver = true
	if(state.values.playerLives <=0){
		alert(`Você Morreu!\nSua pontuação: ${state.values.result}`)
	} else {
		alert(`Game Over!\nSua pontuação: ${state.values.result}`)
	}
	clearInterval(state.actions.countDownId)
	clearTimeout(state.actions.timerId)
}

function clearClasses(){
	state.view.squares.forEach((square)=>{
		square.classList.remove('enemy')
		square.classList.remove('girl')
	})
}

function getRandomSquare(){
	if(!state.values.gameOver){
		clearClasses()

		checKillerDown()
		
		let randomNumber = Math.floor(Math.random() * 9)
		let randomSquare = state.view.squares[randomNumber]
		const newClass = Math.random() > .7 ? 'girl' : 'enemy'
		randomSquare.classList.add(newClass)
		
		state.values.isKillerDown = newClass === 'enemy' ? false : true
		
		state.values.hitPosition = randomSquare.id
		
		clearTimeout(state.actions.timerId)
		const nextCall = Math.floor(Math.random() * 501) + 500
		state.actions.timerId = setTimeout(getRandomSquare, nextCall)
	}
}

function addListenerHitBox(){
	state.view.squares.forEach((square)=>{
		square.addEventListener('mousedown', function(e){
			if(square.id === state.values.hitPosition){
				if(this.classList[1] === 'enemy'){
					hitEnemy()
				} else {
					hitGirl()
				}
			}
		})
	})
}

function checKillerDown(){
	if(!state.values.isKillerDown){
		state.values.playerLives--
		state.view.lives.innerHTML = `x${state.values.playerLives}`
		playAudio('miss')
		console.log(state.values.playerLives)
	}
	
	if(state.values.playerLives <= 0){
		gameOver()
	}
}

function hitEnemy(){
	playAudio('hit')
	state.values.result++
	state.view.score.textContent = state.values.result
	state.values.hitPosition = 0
	state.values.isKillerDown = true
}

function hitGirl(){
	playAudio('miss')
	state.values.result -= 5
	if(state.values.result < 0){
		state.values.result = 0
	}
	state.view.score.textContent = state.values.result
	state.values.hitPosition = 0
}

function playAudio(sound){
	sound === 'hit' ? state.values.hitSound.play() : state.values.missSound.play()
}

function init(){
	addListenerHitBox()
}

init()
