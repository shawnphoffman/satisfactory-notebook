import React, { memo } from 'react'
import { styled } from '@linaria/react'

//
const SettingCheckbox = ({ label, name, checked, onChange, hint }) => (
	<InputContainer>
		<input id={name} name={name} type="checkbox" checked={checked} onChange={onChange} />
		<label htmlFor={name}>{label}</label>
		{hint && <Hint>{hint}</Hint>}
	</InputContainer>
)

export default memo(SettingCheckbox)

const InputContainer = styled.div`
	margin: 8px 0 8px 18px;
	font-size: 0.8em;
`
const Hint = styled.div`
	font-size: 0.8em;
	font-style: italic;
	margin-left: 18px;
	margin-top: 2px;
	color: #444;
`
