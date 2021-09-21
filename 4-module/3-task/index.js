function highlight(table) {
  let row = table.rows;
  let positionGender;
  let positionAge;
  let positionStatus;

  for (let i = 0; i < row[0].cells.length; i++) {
    if (row[0].cells[i].innerHTML === 'Age') {
      positionAge = i;

    }
    if (row[0].cells[i].innerHTML === 'Gender') {
      positionGender = i;

    }
    if (row[0].cells[i].innerHTML === 'Status') {
      positionStatus = i;

    }
  }

  let Container = {
    m: 'male',
    f: 'female',
    true: 'available',
    false: 'unavailable'
  };

  for (let j = 1; j < row.length; j++) {
    let gender = row[j].children[positionGender];
    
    gender.parentNode.classList.add(Container[gender.innerHTML]);

    let age = row[j].children[positionAge].innerHTML;
    
    if (age < 18) {
      gender.parentNode.setAttribute('style', 'text-decoration: line-through');
    }

    let status = row[j].children[positionStatus];
    
    if (status.hasAttribute('data-available')) {
      let elem = status.getAttribute('data-available');
      
      status.parentNode.classList.add(Container[elem]);
    } else {
      status.parentNode.hidden = true;
    }
  }
}
