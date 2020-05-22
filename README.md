# AjaxAssignment

Projektet flyttat till [Quiz Server](https://gitlab.lnu.se/1dv025/content/resource/quiz-server) 2020-05-22.

[![Build Status](https://travis-ci.org/thajo/AjaxAssignment.svg?branch=master)](https://travis-ci.org/thajo/AjaxAssignment)
[![Coverage Status](https://coveralls.io/repos/thajo/AjaxAssignment/badge.png)](https://coveralls.io/r/thajo/AjaxAssignment)
[![Code Climate](https://codeclimate.com/github/thajo/AjaxAssignment/badges/gpa.svg)](https://codeclimate.com/github/thajo/AjaxAssignment)

## Detta är ett repo innehållandes kod till en studentuppgift i kursen Webbteknik I

Koden är skriven för att testa runt bland lit eolika tekniker och är därför inte speciellt konsekvent.

## Installation
* Installera node.js samt npm (node package manager)
* Installera redis server (redis.io) - Se till att den är startad (är egentligen inget appen vinner på men det var kul att testa)
* Se till att ha grunt installerat (npm install grunt --save-dev) samt grunt-cli (npm install grunt-cli -g)
* Kör ´npm install´´ i root-mappen
* Kör tester och code coverage med ´grunt default´´
* Testerna kan också testas med npm test (körs av travis CI)
* grunt build - en task som skapar en arkivfil och flyttar över filer för "pre-production"

## Ändringar i data.json
Då redis-server cachar frågor behöver man gå igenom några steg för att förändrningar ska synas.
* Gör dina ändringar i data.json
* Kör ´redis-cli´ 
* Kör kommandot ´DEL questions´
* Lämna redis-cli (ctrl+c)
* Starta om app.js

### Postman
Det finns en påbörjad lista med API kommandon för chrome-tillägget POSTMAN.


### Vagrant
http://tech.opentable.co.uk/blog/2013/08/16/grunt-plus-vagrant-equals-acceptance-test-heaven/
Stöd för vagrant ska komma. (https://www.npmjs.org/package/grunt-vagrant-commands)
Har använt denna vagrant-fil https://github.com/semmypurewal/node-dev-bootstrap
Kräver VirtualBox + vagrant
