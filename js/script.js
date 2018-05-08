function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	for (var i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}
var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};
$('.create-column').click(function() {
  var name = prompt('Enter a column name', 'Column');
  // jeśli nie podano nazwy - wychodzimy z funkcji
  if (name === null) {
    return;
  }
  // jeśli nazwa jest pusta - ustawiamy "No name given"
  if (name === "") {
    name = "No name given";
  }
  // … i dodajemy nową kolumnę do board'a
  var column = new Column(name);
  board.addColumn(column);
});
//kolumny
function Column(name) {
	var self = this; // useful for nested functions
	this.id = randomString();
	this.name = name;
	this.$element = createColumn();

	function createColumn() {
		// CREATING COMPONENTS OF COLUMNS
		var $columnDelete = $('<button>').addClass('btn-delete-col').text('del column');
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
		// ADDING EVENTS
		$columnDelete.click(function() {
			self.removeColumn();
		});
		$columnAddCard.click(function(event) {
			var name = prompt("Enter the name of the card", "Card");
			var card = new Card(name);
			self.addCard(card);
		});
		// CONSTRUCTION COLUMN ELEMENT
		$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);
		// RETURN OF CREATED COLUMN
		return $column;
	}
}
Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		this.$element.remove();
	}
};
//karty
function Card(description) {
	var self = this;
	this.id = randomString();
	this.description = description;
	this.$element = createCard();

	function createCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		var $cardDelete = $('<button>').addClass('btn-delete').text('del card');
		// BINDING TO CLICK EVENT
		$cardDelete.click(function() {
			self.removeCard();
		});
		// COMBINING BLOCKS AND RETURNING THE CARD
		$card.append($cardDelete).append($cardDescription);
		return $card;
	}
}
Card.prototype = {
	removeCard: function() {
		this.$element.remove();
	}
};

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}
//CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');
// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);
// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');
// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);