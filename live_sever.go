package main

import (
	"bufio"
	"fmt"
	"log"
	"net/http"
	"os"
)

var word (chan string)

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, <-word)
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

	http.HandleFunc("/", hello)

	log.Fatalln(http.ListenAndServe(":8080", nil))
}
