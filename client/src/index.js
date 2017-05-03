var util = require('util')
var blessed = require("blessed"),
  contrib = require("blessed-contrib"),
  screen = blessed.screen(),
  grid = new contrib.grid({ rows: 2, cols: 3, screen: screen });

var line = grid.set(0, 1, 1, 2, contrib.line, {
  style: {
    line: "yellow",
    text: "green",
    baseline: "black"
  },
  xLabelPadding: 3,
  xPadding: 5,
  label: "Stocks"
});


var log = grid.set(0, 0, 1, 1, contrib.log, {
  fg: "green",
  selectedFg: "green",
  label: "Server Log"
});
log.log("Welcome to Once Upon a MUD");
log.log("you spy 3 goblins approaching town");

screen.enableMouse();
screen.on("mouse", (node) => {
  //if(screen.hover) console.log( screen.hover );
  //console.log(m)
  if (screen.hover) {
    screen.hover.focus();
    log.log("over", screen.hover.options.label);
  }
});

//var tree = contrib.tree({fg: 'green'})
var tree = grid.set(1, 0, 1, 1, contrib.tree, {
  label: "Inventory",
  fg: "green"
});
tree.enableMouse();

//allow control the table with the keyboard
tree.focus();
tree.inputOnFocus = true;

tree.on("select", function(node) {
  if (node.myconCustomProperty) {
    log.log(node.myCustomProperty);
  }
  log.log(node.name);
});

// you can specify a name property at root level to display root
tree.setData({
  extended: true,
  children: {
    Wearing: {
      children: {
        Sword: {},
        Shield: {},
        boots: {},
        pants: {}
      }
    },
    Inventory: {
      children: {
        pearls: {},
        "gold 100": {},
        "Rust scraps": {}
      }
    }
  }
});

var lineData = {
  x: ["t1", "t2", "t3", "t4"],
  y: [5, 1, 7, 5]
};

line.setData([lineData]);

var form = grid.set(1, 1, 1, 1, blessed.textbox, {
	  parent: form,
	  name: 'foo',
	  inputOnFocus: true,
	  top: 0,

	  top: 2,
	  left: 0,
	  height: 1,
	  content: 'Bar',
	  tags: true
  }
);
form.focus();
/*
var tb = blessed.textbox({
	  parent: form,
	  name: 'foo',
	  inputOnFocus: true,
	  top: 0,

	  top: 2,
	  left: 0,
	  height: 1,
	  content: 'Bar',
	  tags: true
})*/

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

screen.render();
