interface FileInputProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  display: string;
  accept: string;
  multiple: boolean;
}

function FileInput({
  handleChange,
  display,
  accept,
  multiple,
}: FileInputProps) {
  return (
    <label htmlFor='fileSelector' className='underline cursor-pointer'>
      {display}
      <input
        type='file'
        id='fileSelector'
        name='fileSelector'
        accept={accept}
        className='hidden'
        onChange={handleChange}
        multiple={multiple}
      />
    </label>
  );
}

export default FileInput;
