# jquery-inputCloak

## What is it?

A simple plugin that cloaks/masks an input, similar to a password box.

e.g. 123-45-6789 becomes xxx-xx-6789.

## How do I use it?

### Include js files:
* jQuery
* jquery-inputCloak.min.js

### Select DOM elements and apply cloaking to them

with default settings
```javascript
$('.yourpasswordinput').inputCloak();
```
or with tailored settings, like
```javascript
$('.yourpasswordinput').inputCloak(settings);
```
where settings is an object with any of the following members:

| Name | Options | Description |
| ------- | ----- | ----------- |
| type       | String 'ssn','credit','see4','see1' or 'all'      | Default: 'ssn'. for display respectively like \*\*\*-\*\*-1234, \*1234,\*\*\*\*1234, \*\*\*\*4 or \*\*\*\*, irrelevant if customCloak is used |
| symbol     | any single-char e.g. '\*',\u2022 \(dot\), 'x'  | Default: '\*'. Type of cloak symbol |
| delay      | Integer  | Default: 0. mSec delay between blur event and cloak-application |
| revealOnFocus  | Boolean        | Default: true.  |
| cloakOnBlur    | Boolean        | Default: true.  |
| customCloak    | Function       | Default: undefined. Parameters are value, $element, $cloakedElement. This is called from cloakOnBlur. |

An example customCloak callback is
```javascript
   function mycloaker(value, $element, $cloakedElement) {
     var customMaskValue = some_string_derived_from(value);
     $cloakedElement.val(customMaskValue);
   }
```

### Need more examples?

Head on over [here](http://ermish.github.io/jquery-inputcloak).

## API

Properties added to each selected element
```
.settings = object containing default parameters as modified by initiating application
._defaults = object containing default parameters
._name = constant name of this plugin
```
Methods added to each selected element
```
.cloak(value)
.reveal()
```
##  Copyright and Licensing

Copyright (c) 2014 Philip Ermish

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU General Public License version 3 (the "GPL License"). You may choose either license to govern your use of this software only upon the condition that you accept all of the terms of the chosen license.

You may obtain a copy of the Apache License and the GPL License in the LICENSE file, or at:

[Apache.org](http://www.apache.org/licenses/LICENSE-2.0)<br />
[GNU.org](http://www.gnu.org/licenses/gpl-3.0.html)

Unless required by applicable law or agreed to in writing, software distributed under the Apache License or the GPL License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for the specific language governing permissions and limitations under the Apache License and the GPL License.
