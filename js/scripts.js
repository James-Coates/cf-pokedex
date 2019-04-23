var repository;

repository = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    types: ['Grass', 'Poison']
  },
  {
    name: 'Charmander',
    height: 0.6,
    types: ['Fire']
  },
  {
    name: 'Squirtle',
    height: 0.5,
    types: ['Water']
  },
  {
    name: 'Snorlax',
    height: 2.1,
    types: ['Normal']
  }
];

// Some temporary formatting
document.write('<div class="list-container">')
document.write('<h2>List of Pokèmon</h2>')

// Loop through Pokemon repository and print data
for (var i = 0; i < repository.length; i++){
  var name = repository[i].name;
  var height = repository[i].height;
  var types = repository[i].types;
  var output = '<p>' + name + ' (height: ' + height + 'm)';

  // Highlight large Pokemon
  if (height > 2){
    output = output + ' - Wow that\'s Large! </p>'; 
  } else {
    output = output + '</p>';
  }

  document.write(output);

  // Print types
  document.write('<p>Type: ');
  for (var j = 0; j < types.length; j++){
    var type = types[j];
    var numberOfTypes = types.length - 1;
    var typeClass = 'type type__' + type.toLowerCase();
    var typeOutput = '<span class="' + typeClass + '">' + type + '</span>';

    var output = j < numberOfTypes ? typeOutput + ', ' : typeOutput;
    document.write(output);
  }
  document.write('</p>');
  document.write('<br>');
}

document.write('</div>');