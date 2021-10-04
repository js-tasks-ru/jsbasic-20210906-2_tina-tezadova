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

 
  return result;
}
export default class UserTable {
  #elem = '';
  #template = null;
  constructor(rows) {
    this.#template = TableComponentTemplate(rows);
    this.#elem = this.render();
  }
  render () {
    
    let table = document.createElement("table");
    table.innerHTML = this.#template;
    
    const removeButton = Array.from(table.querySelectorAll('button'));
  
    removeButton.forEach((btn)=> {
      btn.onclick = function(event) {
        let target = event.target;

        target.closest('tr').remove();
      }, { once: true };
    });
    
    return table;
    
    
  }
  
  
 
  get elem() {
    return this.#elem;
  }
  

}

