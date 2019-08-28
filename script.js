
function init() {
  // Popoliamo la lista
  getTodoList();
  // Cancelliamo l'elemento con un click
  $(document).on("click", "p.delete", deleteList);
  // Aggiungiamo l'elemento in lista con un click
  $("#submit").click(createList);
}

// Funzione che svuota il container
function clearList() {
  $(".container").html("");
}

// Funzione per creare nuovi elementi
function createList() {
  // Dichiariamo una variabile con il testo inserito dall'utente
  var input = $("#text-input");
  var textuser = input.val();
  // Chiamata AJAX per rimuovere un oggetto in base all'attributo [data-id]
  $.ajax({
    url: "http://157.230.17.132:3009/todos/",
    method: "POST",
    data: {
      text: textuser
    },
    success: function () {
      getTodoList()
    },
    error: function () {
      alert("C'è stato un errore nel caricamento");
    }
  })
  input.val("");
}

// Funzione che ci permette di cancellare gli elementi in lista
function deleteList() {
  var elemento = $(this);
  var box = elemento.parent();
  var theid = box.data("id")
  // Chiamata AJAX per rimuovere un oggetto in base all'attributo [data-id]
  $.ajax({
    url: "http://157.230.17.132:3009/todos/" + theid,
    method: "DELETE",
    success: function () {
      box.remove();
    },
    error: function () {
      alert("C'è stato un errore nella cancellazione");
    }
  })
}

// Funzione che ci permette di popolare la lista
function getTodoList() {
  // Puliamo tutti gli elementi nel container
  clearList()
  // Chiamata AJAX per popolare la lista
  $.ajax({
    url: "http://157.230.17.132:3009/todos/",
    method: "GET",
    success: function (data) {
      printList(data);
    },
    error: function () {
      alert("C'è stato un errore in download");
    }
  })
}

// Funzione che ci permette di stampare la lista
function printList(list) {
  // Dichiariamo una variabile con i riferimenti del contenitore da popolare
  var contenitore = $(".container");
  // Creo il clone dell'elemento con Handlebars
  var source = $("#item-template").html();
  var template = Handlebars.compile(source);
  // Ciclo for per generare gli oggetti della chiamata in base alla lunghezza della lista
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    // Dichiariamo in una variabile tutti i segnaposto
    var context = {
    text: item.text,
    id: item.id
    };
    // Stampo la lista
    var html = template(context);
    contenitore.append(html);
  }
}

$(document).ready(init);
