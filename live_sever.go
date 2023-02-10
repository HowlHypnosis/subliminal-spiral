package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
)

var currentWord struct {
	sync.Mutex
	text string
}

func wordServer(w http.ResponseWriter, req *http.Request) {
	currentWord.Lock()
	fmt.Fprintf(w, currentWord.text)
	currentWord.Unlock()
}

func spiralHandler(w http.ResponseWriter, req *http.Request) {
	http.ServeFile(w, req, "static/spiral.html")
}

func main() {

	go func() {
		ioreader := bufio.NewReader(os.Stdin)

		for {
			newWord, _ := ioreader.ReadString('\n')

			// Save the word.
			currentWord.Lock()
			currentWord.text = newWord
			currentWord.Unlock()
		}
	}()

	http.HandleFunc("/words", wordServer)
	http.HandleFunc("/spiral", spiralHandler)
	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Println("http://localhost:8080/spiral.html")

	log.Fatalln(http.ListenAndServe(":8080", nil))
}
