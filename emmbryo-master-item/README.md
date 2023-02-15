# &lt;emmbryo-master-item&gt;

This component is a button with a slotted image, used as a sub component in a master mind game, where you choose a certain item to fill up a row in the game.

## Attributes

### `class`

The class sets the background color of the master item. The classes to choose from are:
- coral
- green
- petrol
- yellow
- pink
- brown

## Events

| Event Name | Fired When           |
| ---------- | -------------------- |
| `choice` | The item is clicked. |

It sends along the id of the slotted img with the event (in event.detail), so it can be reproduced in the current row of the master mind game.

## &lt;slot&gt;
The place for the image


## Example

```html
<emmbryo-master-item class="yellow">
    <img slot=img src=""/>
</emmbryo-master-item>
```