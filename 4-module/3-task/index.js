function highlight(table) {
  let row = table.rows;
  let positionGender;
  let positionAge;
  let positionStatus;
  const elementValueMap = {
    m: 'male',
    f: 'female',
    true: 'available',
    false: 'unavailable'
  };

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

  for (let i = 1; i < row.length; i++) {
    let gender = row[i].children[positionGender];
    
    gender.parentNode.classList.add(elementValueMap[gender.innerHTML]);

    let age = row[i].children[positionAge].innerHTML;
    
    if (age < 18) {
      gender.parentNode.setAttribute('style', 'text-decoration: line-through');
    }

    let status = row[i].children[positionStatus];
    
    if (status.hasAttribute('data-available')) {
      let elem = status.getAttribute('data-available');
      
      status.parentNode.classList.add(elementValueMap[elem]);
    } else {
      status.parentNode.hidden = true;
    }
  }
}
