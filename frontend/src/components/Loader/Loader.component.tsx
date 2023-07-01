type Props = {
    isLoading?: boolean;
}

export default function LoaderComponent({ isLoading = true }: Props) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <p className="spinner-border" role="status" />
    </div>
  );
}
