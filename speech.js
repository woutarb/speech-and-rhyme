import Vue from 'vue'

if (!Vue.speech) {
  Vue.speech = true
  Vue.mixin({
    methods: {
      // Start the speech synthesis
      buildSpeech() {
        const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance
        const speechSynthesis = window.speechSynthesis || window.webkitspeechSynthesis

        this.voices = speechSynthesis.getVoices()
        
        this.speech = new SpeechSynthesisUtterance()
        this.speech.lang = 'nl-NL'

        // Set a voice for the speech synthesis
        this.speech.voice = this.voices.filter(voice => voice.name === 'Xander')[0]
        
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.addEventListener('voiceschanged', () => {
            this.voices = speechSynthesis.getVoices()

            this.speech.lang = 'nl-NL'
            this.speech.voice = this.voices.filter(voice => voice.name === 'Xander')[0]
          })
        }
      },
      // Speak a phrase
      speak(phrase, speed = .8) {
        this.speech.rate = speed
        this.speech.text = phrase
        speechSynthesis.speak(this.speech)
      },
      // Send audio feedback
      giveFeedback(result = undefined) {
        this.speak(this.randomText(result))
      },
      // Generate a random positive affirmation
      randomText(positive) {
        const posPhrases = [
          'Goed gedaan!',
          'Netjes!',
          'Je doet het súper!',
          'Helemaal goed!',
          'Je bent een topper!'
        ]
        const negPhrases = [
          'Ik weet dat je het kunt!',
          'Jammer, probeer het nog eens!',
          'Bijna goed!',
          'Helaas pindakaas'
        ]

        const phrases = positive ? posPhrases : negPhrases
        const maximumNumber = phrases.length
        const randomNumber = Math.floor(Math.random() * maximumNumber)
  
        return phrases[randomNumber]
      },
    }
  })
}