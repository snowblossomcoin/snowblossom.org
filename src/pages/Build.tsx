import '../scss/Build.scss';

function Build() {
    return (
      <div className="build main-page">
        <p>
        The source code is here:<br/><a href='https://github.com/snowblossomcoin/snowblossom'>https://github.com/snowblossomcoin/snowblossom</a>
        </p>
        <p>
        Building is done with Bazel (<a href='https://bazel.build/'>https://bazel.build/</a>)
        </p>

        <p>
        For example:
        </p>
        <p>
        bazel build :all
        </p>

      </div>
    );
  }
  
  export default Build;