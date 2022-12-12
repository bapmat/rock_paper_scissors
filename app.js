new Vue({
    el: '#app',
    data: {
        myChoice: null, // 라디오버튼 설정
        comChoice: null,
        count: 3,
        winner: null,
        lifeOfMe: 3,
        lifeOfCom: 3,
        isSelectable: true,
        logs: []
    },
    computed: {
        myChoiceImg: function() {
            // 1번 방법
            if (this.myChoice != null)
            {
                return 'images/' + this.myChoice + '.jpg'
            }
            else
            {
                return 'images/question.jpg'
            }

            // 2번 방법
            //return this.myChoice == null ? 'images/' + this.myChoice + '.jpg' : 'images/question.jpg'

            // 3번 방법
            //return this.myChoice == null ? `images/${this.myChoice}.jpg' : 'images/question.jpg'
        },
        comChoiceImg: function() {
            // 1번 방법
            if (this.comChoice != null)
            {
                return 'images/' + this.comChoice + '.jpg'
            }
            else
            {
                return 'images/question.jpg'
            }

            // 2번 방법
            //return this.comChoice == null ? 'images/' + this.comChoice + '.jpg' : 'images/question.jpg'

            // 3번 방법
            //return this.comChoice == null ? `images/${this.comChoice}.jpg' : 'images/question.jpg'
        }        
    },
    watch: {
        count: function(newVal) {
            if(newVal == 0)
            {
                //console.log('카운트가 0이 되었습니다.')
                
                // 컴퓨터가 가위바위보를 선택하는 부분
                this.selectCom()

                // 가위, 바위, 보 승패 결정하고 남은 몫을 차감
                this.whoIsWin()

                // 게임 초기화
                this.count = 3

                // 버튼이 다시 노출됨
                this.isSelectable = true

                // 가위바위보 로그 업데이트
                this.updateLogs()
            }
        },
        lifeOfYou: function(newVal) {
            if(newVal == 0)
            {
                // 게임 종료
                this.endGame('안타깝네요. 당신이 패배하였습니다.')                
            }
        },
        lifeOfCom: function(newVal) {
            if(newVal == 0)
            {
                // 게임 종료
                this.endGame('축하드립니다. 당신이 승리하였습니다.')                  
            }
        },
    },
    methods: {
        startGame: function() {
            // 버튼이 보이지 않음
            this.isSelectable = false

            // this로 Vue 인스턴스에 접근, data 내에 myChoice 값 가져오기
            if(this.myChoice == null)
            {
                alert('가위 바위 보 중 하나를 선택해주세요.')
            }
            else
            {
                //console.log('선택완료!')
                
                // setInterval을 countDown 변수로 선언 (화살표 함수 사용)
                let countDown = setInterval(()=> {
                    // 1초에 1씩 count를 차감한다.
                    this.count--
                    if(this.count == 0)
                    {
                        clearInterval(countDown)
                    }
                }, 1000)
            }
        },
        selectCom: function() {
            // 0~1 사이의 랜덤숫자
            let number = Math.random()
            if (number < 0.33) 
            {
                this.comChoice = 'scissor'
            }
            else if (number < 0.66) 
            {
                this.comChoice = 'rock'
            }
            else
            {
                this.comChoice = 'paper'
            }
        },
        whoIsWin: function() {
            if(this.myChoice == this.comChoice) this.winner = 'no one'
            else if(this.myChoice == 'rock' && this.comChoice == 'scissor') this.winner = 'me'
            else if(this.myChoice == 'scissor' && this.comChoice == 'paper') this.winner = 'me'
            else if(this.myChoice == 'paper' && this.comChoice == 'rock') this.winner = 'me'
            else if(this.myChoice == 'rock' && this.comChoice == 'paper') this.winner = 'com'
            else if(this.myChoice == 'scissor' && this.comChoice == 'rock') this.winner = 'com'
            else if(this.myChoice == 'paper' && this.comChoice == 'scissor') this.winner = 'com'

            // 몫 차감
            if(this.winner == 'me')
            {
                this.lifeOfCom--
            }
            else if(this.winner == 'com')
            {
                this.lifeOfMe--
            }
        },
        updateLogs: function() {
            let log = {
                message: `You: ${this.myChoice}, Computer: ${this.comChoice}`,
                winner: this.winner
            }
            this.logs.unshift(log)
        },
        endGame: function(msg) {
            // 콜백 함수에 함수를 쓸때는 화살표 함수를 쓴다
            setTimeout(() => {
                confirm(msg)
                this.lifeOfMe = 3
                this.lifeOfCom = 3
                this.myChoice = null
                this.comChoice = null
                this.winner = null
                this.logs = []
            }, 500)    
        }
    },
})