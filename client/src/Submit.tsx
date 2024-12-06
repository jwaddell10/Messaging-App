// @ts-expect-error useFormstatus error
import { useFormStatus } from "react-dom";

export default function Submit({ text }: { text: string }) {
	const { pending } = useFormStatus();

	return (
		<button type="submit" disabled={pending}>
			{pending ? "Submitting" : `${text}`}
		</button>
	);
}
