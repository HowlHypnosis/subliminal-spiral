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
	http.ServeFile(w, req, "index.html")
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

	fmt.Println("WARNING: Currently running in unsecured mode. DO NOT USE FOR PRODUCTION.")

	http.HandleFunc("/words", wordServer)
	http.HandleFunc("/spiral", spiralHandler)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// TODO: ABSOLUTELY GET RID OF THIS
		// DO NOT LEAVE THIS IN PRODUCTION CODE
		// I'M BEGGING YOU
		// do NOT do this. (see below)
		http.ServeFile(w, r, r.URL.Path[1:])
	})

	log.Fatalln(http.ListenAndServe(":8080", nil))
}
