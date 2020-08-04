package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
)

var word (chan string)

func wordServer(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, <-word)
}

func spiralHandler(w http.ResponseWriter, req *http.Request) {
	http.ServeFile(w, req, "static/index.html")
}

func main() {

	word = make(chan string)

	go func() {
		ioreader := bufio.NewReader(os.Stdin)

		for {
			newWord, _ := ioreader.ReadString('\n')

			// Send the new word
			select {
			case word <- newWord:
			default:
			}
		}
	}()

	http.HandleFunc("/words", wordServer)
	http.HandleFunc("/spiral", spiralHandler)
	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Fatalln(http.ListenAndServe(":8080", nil))
}
