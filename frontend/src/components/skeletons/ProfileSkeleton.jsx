

const ProfileSkeleton = ({ isOwnProfile }) => {
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center space-y-2">
            <div className="skeleton h-8 w-24 mx-auto" />
            <div className="skeleton h-5 w-44 mx-auto" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="skeleton size-32 rounded-full border-4 border-base-200" />
              {isOwnProfile && (
                <div className="absolute bottom-0 right-0 skeleton size-9 rounded-full" />
              )}
            </div>
            <div className="skeleton h-4 w-56" />
          </div>

          <div className="space-y-6">
            {isOwnProfile ? (
              <>
                <div className="space-y-1">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <p className="w-4 h-4" />
                    <div className="skeleton h-4 w-8" />
                  </div>
                  <div className="skeleton h-11 w-full rounded-lg" />
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <p className="w-4 h-4" />
                    <div className="skeleton h-4 w-20" />
                  </div>
                  <div className="skeleton h-11 w-full rounded-lg" />
                </div>
              
                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <p className="w-4 h-4" />
                    <div className="skeleton h-4 w-28" />
                  </div>
                  <div className="skeleton h-11 w-full rounded-lg" />
                </div>
              </>
            ) : (
              <div className="mt-2 bg-base-300 rounded-xl p-6 pt-1 pb-1">
                <div className="space-y-1 flex items-center justify-center mb-2">
                  <div className="flex items-center justify-center gap-2">
                    <p className="w-5 h-5 text-zinc-400" />
                    <div className="skeleton h-4 w-16" />
                  </div>
                </div>
                <div className="skeleton h-7 w-36 mb-4" />
                <div className="space-y-1 flex flex-start gap-2 mb-2">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <p className="w-4 h-4" />
                    <div className="skeleton h-4 w-8" />
                  </div>
                  <div className="skeleton h-4 w-24" />
                </div>
                <div className="space-y-1 flex flex-start gap-2">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <p className="w-4 h-4" />
                    <div className="skeleton h-4 w-10" />
                  </div>
                  <div className="skeleton h-4 w-32" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-2 bg-base-300 rounded-xl p-6 pt-2">
            <div className="skeleton h-7 w-44 mb-4" />
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <div className="skeleton h-4 w-24" />
                <div className="skeleton h-4 w-24" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="skeleton h-4 w-28" />
                <div className="skeleton h-4 w-14" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
