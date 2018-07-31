# stylus2scss-experimental

Experimental transform Stylus to SCSS.
Select the code written in Stylus and run `Transform Stylus to SCSS` on command palette, then you get SCSS snippet.

## Features

### Example Input

```stylus
.base
    font-size $font-size-small
    border 1px solid $color-status-error
    border-radius $radius-default
    margin gutter(1) 0

    &-title
        font-weight bold
        color $color-status-error-default
        border-radius $radius-default $radius-default 0 0
        background-color $color-background-note
        @media(max-width: $screen-xs-max) and (min-width: $screen-xs-max)
            padding gutter(1) gutter(2) gutter(1) gutter(1.5)
```

### Example Output

```scss
.base {
  font-size: $font-size-small;
  border: 1px solid $color-status-error;
  border-radius: $radius-default;
  margin: gutter(1) 0;
  &-title {
    font-weight: bold;
    color: $color-status-error-default;
    border-radius: $radius-default $radius-default 0 0;
    background-color: $color-background-note;
    @media (max-width: $screen-xs-max) (min-width: $screen-xs-max) {
      padding: gutter(1) gutter(2) gutter(1) gutter(1.5);
    }
  }
}
```

## Known Issues

- Syntactic analysis may not work well.

## Release Notes

### 1.0.0

Initial release
