# Text Area

- Form state is handled by [informed](https://github.com/joepuzzo/informed).
- `TextArea` is a custom `informed` element, using the `asField` decorator. Read the [Informed Custom Input docs](https://joepuzzo.github.io/informed/?path=/story/custominputs--creating-custom-inputs).
- `TextArea` must be a child of `informed.Form`. Use the `withInformed` HOC to wrap your component in a `Form`.

<!-- STORY -->

## Usage example

```jsx
import { withInformed } from 'app/components'
import { TextArea } from 'app/ui-kit'

const fieldConfig = {
  message: {
    label: 'Message',
    field: 'message',
    placeholder: 'Type your message',
    validate: (value) => {
      if (!value || value.length < 1) return 'Required'
      return null
    }
  }
}

@withInformed
class FormWrap extends React.Component {
  render = () => {
    return <TextArea {...fieldConfig.message} />
  }
}
```
