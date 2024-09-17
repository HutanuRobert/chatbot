interface noDataProps {}

export default function NoDataComponent(props: noDataProps) {
	return (
  <div className="no-data-container">
      <p className="no-data-text">No stock exchange data available.</p>
    </div>
	)
}
