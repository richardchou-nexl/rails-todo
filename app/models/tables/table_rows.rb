# typed: strict

module Tables
  module TableRows
    extend T::Sig
    extend T::Helpers

    abstract!

    sig { abstract.returns(T::Array[TableRow]) }
    def entries; end

    sig { abstract.returns(Integer) }
    def total_count; end

    sig { abstract.returns(Integer) }
    def total_pages; end
  end
end
