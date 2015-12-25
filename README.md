# jquery-inputcloak

## What is it?

A simple plugin that cloaks/masks an input, similar to a password box.

Ex. 123-45-6789 becomes xxx-xx-6789.

## How do I use it?

### Include js files: 
* jQuery 
* jquery-inputCloak.min.js

### Select any element and cloak them!
```javascript
$('.yourpasswordinput').inputCloak();
```

## Examples

Several options are available including pre-defined input types: 

```javascript
$('.yourpasswordinput').inputCloak({
   type: 'ssn',
   delay : 1000,
   symbol : '*'
});
```

You can also define a custom cloak method callback:
```javascript
function getFromServer(value, $element, $cloakedElement){
   var customMaskValue = $.ajax({
    //get mask
   });
    $cloakedElement.val(cloakedValue);
    $element.val(value);
}

$('.yourpasswordinput').inputCloak({
   customCloak : getFromServer
});
```

### Need more examples?

Head on over to [ermish.github.io/jquery-inputcloak](http://ermish.github.io/jquery-inputcloak).




## Available Settings

| Setting | Options | Description |
| ------- | ----- | ----------- |
| type       | 'ssn','credit' or 'all'      | Default: 'ssn'. for display respectively like \*\*\*-\*\*-1234,\*1234 or \*\*\*\*,
|            |                              | irrelevant if customCloak is used|   
| symbol  | any single-char e.g. '\*',\u2022 \(dot\), 'x'\  | Default: 0. Type of cloak symbol |   
| delay     | Integer  | Default: 0. mSec delay between blur event and cloak-application | 
| revealOnFocus     | Boolean        | Default: true.  | 
| cloakOnBlur    | Boolean        | Default: true |   
| customCloak    | Function        | Default: undefined. Parameters are value, $element, $cloakedElement. This is called from cloakOnBlur. [example](##Examples)  |    

##  Copyright and Licensing

Copyright (c) 2014 Philip Ermish

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU General Public License version 3 (the "GPL License"). You may choose either license to govern your use of this software only upon the condition that you accept all of the terms of either the Apache License or the GPL License.

You may obtain a copy of the Apache License and the GPL License in the LICENSE file, or at:

[Apache.org](http://www.apache.org/licenses/LICENSE-2.0)<br />
[GNU.org](http://www.gnu.org/licenses/gpl-3.0.html)

Unless required by applicable law or agreed to in writing, software distributed under the Apache License or the GPL License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for the specific language governing permissions and limitations under the Apache License and the GPL License.
