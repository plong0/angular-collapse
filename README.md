# angular-collapse
ng-collapse directive for angular, providing customizable collapse animations

## installation
```bower install angular-collapse```

## usage
**basic example:**
```
<button ng-click="open=!open">Open It</button>
<div ng-collapse="open">
    Collapsible div!
</div>
```
*results in vertical collapse from top*

**collapse-options example:**
```
<button ng-click="open=!open">Open It</button>
<div ng-collapse="open" collapse-options="{ horizontal: true, vertical: true, duration: '1.0s', timing: 'linear' }">
    Collapsible div!
</div>
```
*results in 1.0 second, linear timed, horizontal + vertical collapse from top-left corner*

**horizontal from right example:**
```
<button ng-click="open=!open">Open It</button>
<div ng-collapse="open" collapse-options="{ horizontal: 'right' }">
    Collapsible div!
</div>
```
*results in horizontal collapse from right*

**vertical from bottom example:**
```
<button ng-click="open=!open">Open It</button>
<div ng-collapse="open" collapse-options="{ vertical: 'bottom' }">
    Collapsible div!
</div>
```
*results in vertical collapse from bottom*
