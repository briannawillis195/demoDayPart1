var check = document.getElementsByClassName("fa fa-solid fa-check");
var trash = document.getElementsByClassName("fa fa-trash-o");



Array.from(check).forEach(function(element) {
      element.addEventListener('click', function(){
        const book = this.parentNode.parentNode.childNodes[1].innerText
        const author = this.parentNode.parentNode.childNodes[3].innerText

        fetch('/messages/doneReading', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'book': book,
            'author': author,
            read: true
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


// this array is used to show how to delete the messages
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const book = this.parentNode.parentNode.childNodes[1].innerText
        const author = this.parentNode.parentNode.childNodes[3].innerText
        
        fetch('/messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'book': book,
            'author': author,
            'watched': false
          })
        }).then(function (response) {
          window.location.reload() //triggers the get request
        })
      });
});