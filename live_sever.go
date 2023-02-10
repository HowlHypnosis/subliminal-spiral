package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
)

// Channel to synchronise long-polling.
var waitForNewWord chan struct{}

var currentWord struct {
	sync.RWMutex
	text string
}

func wordServer(w http.ResponseWriter, req *http.Request) {

	// Wait for a new word to be input.
	<-waitForNewWord
	currentWord.RLock()
	fmt.Fprintf(w, currentWord.text)
	currentWord.RUnlock()
}

func spiralHandler(w http.ResponseWriter, req *http.Request) {
	http.ServeFile(w, req, "static/spiral.html")
}

func main() {

	// Indictator for a word change
	waitForNewWord = make(chan struct{})

	go func() {
		ioreader := bufio.NewReader(os.Stdin)

		for {
			newWord, _ := ioreader.ReadString('\n')

			// Save the word.
			currentWord.Lock()
			currentWord.text = newWord
			currentWord.Unlock()

			// Close the existing channel to broadcast
			// and then create a new channel for the next session.
			close(waitForNewWord)
			waitForNewWord = make(chan struct{})
		}
	}()

	http.HandleFunc("/words", wordServer)
	http.HandleFunc("/spiral", spiralHandler)
	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Println("http://localhost:8080/spiral.html?subliminal_mode=live")

	log.Fatalln(http.ListenAndServe(":8080", nil))
}
