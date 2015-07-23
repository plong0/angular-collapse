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
*results in vertical collapse*

**collapse-options example:**
```
<button ng-click="open=!open">Open It</button>
<div ng-collapse="open" collapse-options="{ horizontal: true, vertical: true }">
    Collapsible div!
</div>
```
*results in horizontal + vertical collapse from top-left corner*

Planned features:
* centered collapse (ie. "curtains")
* directional collapse (ie. from right, from bottom)
