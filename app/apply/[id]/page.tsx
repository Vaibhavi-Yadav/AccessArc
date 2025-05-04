import JobApplicationForm from "@/components/JobApplicationForm"

type Props = {
  params: {
    id: string
  }
}

const ApplyPage = ({ params }: Props) => {
  return <JobApplicationForm jobId={params.id} />
}

export default ApplyPage
