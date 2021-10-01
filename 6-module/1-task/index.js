/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

function TableComponentTemplate(items) {
  let table = document.createElement("table");
  let result = `
  <thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
  </thead>
  <tbody>
      
      ${items.map((item) =>
    `<tr>
    <td>${item.name}</td> 
    <td>${item.age}</td>
    <td>${item.salary}</td>
    <td>${item.city}</td>
    <td><button>X</button></td>
    </tr>`).join('')}
      </tr>
      </tbody>
  `;
  table.innerHTML = result;
  
  const removeButton = Array.from(table.querySelectorAll('button'));
  
  removeButton.forEach((btn)=> {
    btn.onclick = function(event) {
      let target = event.target;

      target.parentNode.parentNode.remove();
      console.log(target.parentNode);
    };
  });
  
  return table;
}
export default class UserTable {
  #elem = '';
  constructor(rows) {
    this.#elem = new TableComponentTemplate(rows);
  }
 
  get elem() {
    return this.#elem;
  }
  

}

