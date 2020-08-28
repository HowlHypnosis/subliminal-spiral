package main

import (
	"bufio"
	"container/list"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
)

var initWords = [...]string{"HELLO", "WELCOME BACK", "DROP DEEP", "DROP DEEP", "GOOD BOY", "GOOD GIRL", "WAKING", "WAKING", "1", "2", "3", "4", "5", "WAKE"}
var words *list.List

var currentWord struct {
	sync.Mutex
	index int
}

func wordServer(w http.ResponseWriter, req *http.Request) {
	currentWord.Lock()
	if words.Len() == 0 {
		fmt.Fprintln(w, "")
	} else {
		fmt.Fprintln(w, words.Front().Value.(string))
		words.Remove(words.Front())
	}
	currentWord.Unlock()
}

func spiralHandler(w http.ResponseWriter, req *http.Request) {
	http.ServeFile(w, req, "static/index.html")
}

func main() {

	// Read in the word list from the "words.txt" file.

	buf, err := os.Open("words.txt")
	if err != nil {
		log.Fatal(err)
	}

	words = list.New()

	snl := bufio.NewScanner(buf)
	for snl.Scan() {
		words.PushBack(snl.Text())
	}
	err = snl.Err()
	if err != nil {
		log.Fatal(err)
	}

	// Close the buffer
	if err = buf.Close(); err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/words", wordServer)
	http.HandleFunc("/spiral", spiralHandler)
	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Fatalln(http.ListenAndServe(":8080", nil))
}
