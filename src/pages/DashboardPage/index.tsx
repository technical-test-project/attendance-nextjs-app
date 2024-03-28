const DashboardPage = () => {

    return (
        <div className="min-h-screen container mx-auto py-12 px-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>

            <div className="card card-compact w-1/3 bg-base-300 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Absen Sekarang</button>
                    </div>
                </div>
            </div>

        </div>);
};

export default DashboardPage;