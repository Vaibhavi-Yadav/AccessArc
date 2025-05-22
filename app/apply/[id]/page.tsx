import JobApplicationForm from "@/components/JobApplicationForm"

type Props = {
  params: Promise<{
    id: string
  }>
}

const ApplyPage = async ({ params }: Props) => {
  const { id } = await params
  return <JobApplicationForm jobId={id} />
}

export default ApplyPage