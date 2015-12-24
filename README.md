# jquery-inputcloak

## What is it?

A simple plugin that cloaks/masks an input, similar to a password box.

Ex. 123-45-6789 becomes xxx-xx-6789.

## How do I use it?

Include relevant js files - jQuery and jquery.inputcloak.min.js

Select page elements and apply cloaking to them, with default settings or customised ones, like
```javascript
$('.yourpasswordinput').inputCloak();
```
OR
```javascript
$('.yourpasswordinput').inputCloak({settings});
```
where settings is an object with as many as relevant of the following members:
\(default is shown first\)

 type: 'all' \('ssn','credit' or 'all'
   for display respectively like ***-**-1234,*1234 or ****,
   irrelevant if customCloak is used\)<br />
 symbol: '\*' \(any single-char e.g. '*',\u2022 \(dot\), 'x'\)<br />
 delay: 0 \(mSec delay between blur event and cloak-application\)<br />
 revealOnFocus: true \(or false\)<br />
 cloakOnBlur: true \(or false\)<br />
 customCloak : undefined \(or name of callback, as
```javascript
   callback(value, $element, $cloakedElement) {
     determine cloakedValue from value
     $cloakedElement.val(cloakedValue);
     $element.val(value);
   }
```
  \)

Head on over to [github](http://ermish.github.io/jquery-inputcloak) for examples.

##  Copyright and Licensing

Copyright (c) 2014 Philip Ermish

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU General Public License version 3 (the "GPL License"). You may choose either license to govern your use of this software only upon the condition that you accept all of the terms of either the Apache License or the GPL License.

You may obtain a copy of the Apache License and the GPL License in the LICENSE file, or at:

[Apache.org](http://www.apache.org/licenses/LICENSE-2.0)<br />
[GNU.org](http://www.gnu.org/licenses/gpl-3.0.html)

Unless required by applicable law or agreed to in writing, software distributed under the Apache License or the GPL License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for the specific language governing permissions and limitations under the Apache License and the GPL License.
