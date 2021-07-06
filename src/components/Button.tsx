interface IButtonProps {
    title: string;
    onSubmit: (e: any) => void;
}

export const Button = (props: IButtonProps) => (
    <button
        onClick={props.onSubmit}
    >
        {props.title}
    </button>
)