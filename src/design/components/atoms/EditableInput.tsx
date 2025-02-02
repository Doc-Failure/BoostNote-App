import React, {
  useState,
  useRef,
  useCallback,
  ChangeEventHandler,
  useEffect,
  KeyboardEventHandler,
  useMemo,
} from 'react'
import Icon from './Icon'
import { mdiPencilOutline, mdiCheck } from '@mdi/js'
import styled from '../../lib/styled'
import { max } from 'ramda'
import FormInput from '../molecules/Form/atoms/FormInput'
import Button from './Button'
import { overflowEllipsis } from '../../lib/styled/styleFunctions'

interface EditableInputProps {
  editOnStart?: boolean
  placeholder?: string
  text: string
  onTextChange: (newText: string) => void
  disabled?: boolean
  onKeydownConfirm?: () => void
}

type EditableInput = {
  folderLabel: string
  folderPathname: string
}[]

const EditableInput = ({
  editOnStart = false,
  placeholder,
  disabled,
  text,
  onTextChange,
  onKeydownConfirm,
}: EditableInputProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null)
  const textRef = useRef(text)

  const [editingText, setEditingText] = useState(editOnStart)
  const [newText, setNewText] = useState(() => {
    return text || ''
  })

  const startEditingText = useCallback(() => {
    if (text == null) {
      return
    }
    setEditingText(true)
    setNewText(text)
  }, [text])

  useEffect(() => {
    if (editingText && titleInputRef.current != null) {
      titleInputRef.current.focus()
    }
  }, [editingText])

  useEffect(() => {
    if (textRef.current === text) {
      return
    }

    textRef.current = text
    setEditingText(false)
  }, [text])

  const updateNewText: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setNewText(event.target.value)
    },
    []
  )

  const finishEditingText = useCallback(() => {
    if (onTextChange == null) {
      return
    }
    onTextChange(newText)
    setEditingText(false)
  }, [onTextChange, newText])

  const cancelEditingText = useCallback(() => {
    setEditingText(false)
    setNewText(text)
  }, [text])

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      finishEditingText()
      if (onKeydownConfirm != null) {
        onKeydownConfirm()
      }
      return
    },
    [onKeydownConfirm, finishEditingText]
  )

  const handleTextInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      switch (event.key) {
        case 'Esc':
        case 'Escape':
          event.preventDefault()
          cancelEditingText()
          break
      }
    },
    [cancelEditingText]
  )

  const maxWidth: string | number = useMemo(() => {
    // HTML5 canvas width to calculate
    if (titleInputRef.current != null && window != null) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (context != null) {
        context.font = window.getComputedStyle(titleInputRef.current).font
        const width = context.measureText(newText).width + 40
        return `${max(width, 60)}px`
      }
    }

    return `${max(newText.length, 8)}em`
  }, [newText])

  return (
    <EditableInputContainer className='editable__input'>
      {editingText ? (
        <form onSubmit={onSubmit} style={{ maxWidth }}>
          <FormInput
            placeholder={placeholder}
            ref={titleInputRef}
            onChange={updateNewText}
            value={newText}
            onKeyDown={handleTextInputKeyDown}
            disabled={disabled}
          />
          <Button
            variant='icon'
            iconPath={mdiCheck}
            iconSize={16}
            type='submit'
            size='sm'
            disabled={disabled}
          />
        </form>
      ) : (
        <Button
          variant='transparent'
          className='editable__input__btn'
          onClick={startEditingText}
          size='sm'
          disabled={disabled}
        >
          <span className='editable__input__btn__label'>
            {text.trim().length === 0 ? 'Untitled' : text}
            <Icon
              className='editable__input__btn__icon'
              path={mdiPencilOutline}
              size={16}
            />
          </span>
        </Button>
      )}
    </EditableInputContainer>
  )
}

const EditableInputContainer = styled.div`
  display: flex;
  flex: 1;
  height: fit-content;
  overflow-x: hidden;

  form {
    display: flex;
    flex: 1 1 50px;
    flex-wrap: nowrap;
    align-items: center;
  }

  button[type='submit'] {
    flex: 0 1 auto;
  }

  .editable__input__btn {
    flex: 0 1 auto;
    min-width: 0;
    display: flex;
    align-items: center;
    .editable__input__btn__icon {
      margin-right: 4px;
      margin-left: 4px;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    &:hover {
      .editable__input__btn__icon {
        opacity: 1;
      }
    }
    .editable__input__btn__label {
      padding: 2px 5px;
      border-radius: 3px;
      ${overflowEllipsis}
      min-width: 0;
      display: flex;
      align-items: center;
    }
  }
`

export default EditableInput
