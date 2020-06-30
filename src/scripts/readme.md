# JS Scripts Structures, Explanation, and Example

## Folder Explanation

### variables
colors, screensize, regex, API url, etc.

### utils
Function utilities that doesn't depend on project (ie: simple validation, responsive, timestamp to date, etc.)

### components
Reusable function that on related project (ie: slider, popup, etc.)

### pages
One time usage function that unique on related project's page

### vendors
This is where you put jQuery and jQuery plugins

### services (optional)
API related functions

### dummies (optional)
Dummies data for the API functions


## JS Class Example
test.js

```
export default class Test {

  constructor(param) {
    this.nana = param;
  }

  global() {

  }

  function2() {

  }

  function3() {

  }

  init() {
    this.global();
  }

}
```

index.js on scripts
```
const testtt = new Test('ganteng');

// example how to call a function
testtt.function2()
```

**1 file only have 1 class**