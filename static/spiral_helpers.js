// Centre the canvas in the middle of the screen.
function stationary_centre() {
    translate(width / 2, 
              height / 2);
}

// Move the centre of the canvas in a circle, completing a rotation every `frequency` frames.
function moving_centre(frequency, offset) {
    translate(width / 2 + offset*cos(2 * PI * frameCount / frequency), 
              height / 2 + offset*sin(2 * PI * frameCount / frequency));
}

// First 168 primes.
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]


const WORD_ADDRESS = "words"

// Functions to get a single word from the server.
function handle_single_word(response) {
    print(response)
    if (parameters["subliminal_mode"] == "live") {
        wordQueue.push(response)
    }
}

async function subscribe_to_script_server() {
    let response = await fetch("/" + WORD_ADDRESS);
    
    print("subscription ping")

    if (response.status == 502) {
        // Status 502 is a connection timeout error,
        // may happen when the connection was pending for too long,
        // and the remote server or a proxy closed it
        // let's reconnect
        await subscribe_to_script_server();
    } else if (response.status != 200) {
        // An error - let's show it
        showMessage(response.statusText);
        // Reconnect in one second
        await new Promise(resolve => setTimeout(resolve, 1000));
        await subscribe_to_script_server();
    } else {
        // Get and show the message
        let message = await response.text();
        print(message)
        handle_single_word(message);
        // Call subscribe() again to get the next message
        await subscribe_to_script_server();
    }
    
    subscribe_to_script_server();
}